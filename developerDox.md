**_ CLIENT SIDE _**

**_ Recordings Table _**
**src code** src/features/recordings/components/RecordingsTable.tsx

This table reads data from api which is fetched using react query.
**src code**
for hook that uses react query to fetch data from flask api (server side)
src/features/recordings/useRecordings.ts

user fills in reaquied param form
**src code** src/features/recordings/components/RequiredParamsForm.tsx
submit action on this form will trigger a popup that holds filter param form which is required by vicidial api.
the popup state is controlled using state management library **REDUX**

const onSubmit = (data: ViciRequiredParamsType) => {
console.log("Form Submit Triggered", { data });
const parsedData = ViciRequiredParams.parse(data);
try {
console.log("Parsed Form Data:", parsedData);
dispatch(setRequiredParams(parsedData));
// queryMutation.mutate({ requiredForm: data, filterForm: {} });
dispatch(setIsFilterPopoverOpen(true));
} catch (error) {
console.error("Form Submission Error:", error);
}
};

The user has to submit atleast one filter to get the data from api
submit action on filter form triggeres react query hook (mutation) which fetches the data from flask api
**src code** src/features/recordings/components/FilterParamsForm.tsx

const onSubmitHandler = (data: ViciFilterParamsType) => {
const parsedData = ViciFilterParams.parse(data);
try {
// const parsedData = ViciRequiredParams.parse(data);
console.log("Parsed Form Data:", parsedData);
dispatch(setFilterParams(parsedData));
filterMutation.mutate(
{ filterForm: parsedData },
{
onSuccess: () => {
dispatch(setIsFilterPopoverOpen(false));
},
},
);
// setOpen(false);
} catch (error) {
console.error("Form Submission Error:", error);
// Optional: Add error toast or user notification
}
};

**src code** src/features/recordings/useViciQueryMutation.ts
below hook is used to do the mutation and handle errors.

export function useViciQueryMutation() {
const dispatch = useAppDispatch();
const { requiredParams, filterParams, pagination } = useAppSelector((state) => state.recordings);
const queryClient = useQueryClient();
const mutation = useMutation({
mutationFn: async ({ requiredForm, filterForm, paginationForm }: MutationFNProps) => {
const viciReqParams = requiredForm || requiredParams;
if (!viciReqParams.dialer_url || !viciReqParams.user || !viciReqParams.pass)
throw new Error("Select A Dialer First");
const viciFiltParams = filterForm || filterParams;
const viciPaginParams = paginationForm || { ...pagination, page: 1 };
const response = await getrecordings(viciReqParams, viciFiltParams, viciPaginParams);
return response;
},
onMutate: (variables) => {
queryClient.invalidateQueries({ queryKey: [recordsQueryKey] });
return variables;
},
onSuccess: (newData) => {
dispatch(setPageCount(Number(newData.total_records)));
queryClient.setQueryData([recordsQueryKey], newData);
},
onError: (error) => {
console.log({ error });
queryClient.invalidateQueries({ queryKey: [recordsQueryKey] });
queryClient.setQueryData([recordsQueryKey], { error });
},
});

return mutation;
}

**src code** for actual api call

export const getrecordings: TGetRecordingsFuncV1 = async (requiredParams, filterParams, pagination) => {
try {
const response = await apiFlask.post("/portal/recordings", { ...requiredParams, ...filterParams, ...pagination });
return response.data;
} catch (error) {
if (axios.isAxiosError(error)) {
if (error.response) {
throw error.response.data; // Throw full error response
} else if (error.request) {
throw { message: "No response received from server." };
}
}
throw { message: "An unexpected error occurred." };
}
};

where apiFlask is a interceptor that handles url as well as major errors

src/lib/interceptors.ts

once data is mutated (new data is received from api) recordings table is rendered. We are handling pages using state management redux. every time a page is mutated, mutation hook is triggered with all the same data from forms and changed page.

**src code** src/features/recordings/components/Pagination.tsx

useEffect(() => {
console.log(pagination);
paginMutation.mutate({ paginationForm: pagination });
}, [pagination]);

**_ SERVER SIDE _**
for server code we are using flask api that connects the client side with vicidial api.

Recordings api call from client is received in flask app at
http://qaportal.dialer360.com:5001/portal/recordings
this is a POST api that recived required params and filter params from the client side (mutation hook)

this body is sanitized and sent to vicidial api for the recordings.
Api contoller from flask also handles formatting the data received from vicidial and turn it in to valid json and send the json response to client

**src code**

@portal_bp.route('/recordings', methods=['POST'])
@jwt_required()
def recordingsApi(): # Extract JSON body
current_user = get_jwt_identity()
user_id = current_user["user_id"]
data = request.get_json()

    logger.info(f"User {user_id} initiated a recordings lookup with data: {data}")

    # Check for required fields
    # required_params = ['dialer_url', 'user', 'pass', 'agent_user', 'date']
    required_params = ['dialer_url', 'user', 'pass']
    missing_params = [param for param in required_params if param not in data]
    if missing_params:
        return jsonify({"error": f"Missing required parameters: {', '.join(missing_params)}"}), 400

    # Extract optional parameters with default values
    date = data.get('date', '')
    duration = data.get('duration', 'Y')
    header = data.get('header', 'YES')
    stage = data.get('stage', 'tab')
    source = data.get('source', 'test')
    folder_name = data.get('folder_name') or 'vicidial'
    page = data.get('page', 1)
    per_page = data.get('per_page', 100)
    statusFilter = data.get('statusFilter', '') or request.json.get('status', '')
    phone_number = data.get('phone_number', '')
    lead_id = data.get('lead_id', '')

    if isinstance(statusFilter, list):
        statusFilter = ','.join(statusFilter)
    # Prepare parameters for the VICIdial request
    vicidial_params = {
        'function': 'recording_status_filter',
        'user': data['user'],
        'pass': data['pass'],
        'date': date,
        'agent_user': data.get('agent_user', '').strip(),
        'duration': duration,
        'header': header,
        'stage': stage,
        'source': source,
        'page': page,
        'per_page': per_page,
        'status': statusFilter,
        'phone_number': phone_number,
        "lead_id": lead_id
    }

    # vicidial_url = f"http://{data['dialer_url']}/vicidial/non_agent_api_V2.php"
    vicidial_url = f"http://{data['dialer_url']}/{folder_name}/non_agent_api_V2.php"

    # Debugging: Print the full URL
    full_url = f"{vicidial_url}?{'&'.join([f'{k}={v}' for k, v in vicidial_params.items()])}"
    print(f"Complete URL: {full_url}")
    logger.info(f"User {user_id} made request to {full_url}")
    try:
        # Request data from VICIdial API
        response = requests.get(vicidial_url, params=vicidial_params)
        # Forward VICIdial's status code and content directly if it's an error
        if response.ok:
            if response.text.strip().startswith("ERROR:"):
                error_message = response.text.strip()
                logger.error(f"VICIdial API Error: {error_message}")
                return jsonify({"error": error_message}), 400  # Use appropriate status code
        else:
            try:
                error_content = response.json()
            except json.JSONDecodeError:
                error_content = {"error": response.text or "Unknown error from VICIdial API."}
            logger.error(f"VICIdial API Error: {error_content}")
            return jsonify(error_content), response.status_code

        # Convert pipe-separated response to JSON format
        lines = response.text.strip().split('\n')  # Split response into lines
        headers = lines[0].split('|')  # First line as headers (pipe-separated)
        data_lines = lines[1:-1]
        meta_line = lines[-1]

        # Parse metadata
        meta_data = json.loads(meta_line).get("meta", {})

        # Parse data lines into dictionaries
        data = []
        for line in data_lines:
            values = line.split('|')
            row = dict(zip(headers, values))
            data.append(row)

        logger.info(f"User {user_id} successfully fetched recordings page {meta_data.get('current_page', 'unknown')} out of {meta_data.get('total_pages', 'unknown')} where total recordings are {meta_data.get('total_records', 'unknown')} .")
        # Return paginated data with metadata
        return jsonify({
            "data": data,
            **meta_data  # Include metadata fields
        })

    except requests.exceptions.RequestException as e:
        logger.error(f"User {user_id} encountered an error during recordings lookup: {e}")
        return jsonify({"error": str(e)}), 500
    except ValueError as ve:
        logger.error(f"Value error: {ve}")
        return jsonify({"error": str(ve)}), 500