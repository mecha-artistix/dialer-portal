**_ CLIENT SIDE _**

**_ Recordings Table _**
**src code**: `src/features/recordings/components/RecordingsTable.tsx`
This table reads data from API which is fetched using React Query.

**src code**:
For hook that uses React Query to fetch data from Flask API (server side):
`src/features/recordings/useRecordings.ts`

User fills in required param form
**src code**: `src/features/recordings/components/RequiredParamsForm.tsx`
Submit action on this form will trigger a popup that holds filter param form which is required by VICIdial API.
The popup state is controlled using state management library **REDUX**

```ts
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
```

The user has to submit at least one filter to get the data from API.
Submit action on filter form triggers React Query hook (mutation) which fetches the data from Flask API.
**src code**: `src/features/recordings/components/FilterParamsForm.tsx`

```ts
const onSubmitHandler = (data: ViciFilterParamsType) => {
  const parsedData = ViciFilterParams.parse(data);
  try {
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
  } catch (error) {
    console.error("Form Submission Error:", error);
    // Optional: Add error toast or user notification
  }
};
```

**src code**: `src/features/recordings/useViciQueryMutation.ts`
Below hook is used to do the mutation and handle errors.

```ts
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
```

**src code** for actual API call

```ts
export const getrecordings: TGetRecordingsFuncV1 = async (requiredParams, filterParams, pagination) => {
  try {
    const response = await apiFlask.post("/portal/recordings", { ...requiredParams, ...filterParams, ...pagination });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw { message: "No response received from server." };
      }
    }
    throw { message: "An unexpected error occurred." };
  }
};
```

Where `apiFlask` is an interceptor that handles URL as well as major errors:
`src/lib/interceptors.ts`

Once data is mutated (new data is received from API), the recordings table is rendered.
We are handling pages using state management Redux. Every time a page is mutated, mutation hook is triggered with all the same data from forms and changed page.

**src code**: `src/features/recordings/components/Pagination.tsx`

```ts
useEffect(() => {
  console.log(pagination);
  paginMutation.mutate({ paginationForm: pagination });
}, [pagination]);
```

**_ SERVER SIDE _**
For server code we are using Flask API that connects the client side with VICIdial API.

Recordings API call from client is received in Flask app at:
`http://qaportal.dialer360.com:5001/portal/recordings`
This is a POST API that receives required params and filter params from the client side (mutation hook).

The body is sanitized and sent to VICIdial API for the recordings.
API controller from Flask also handles formatting the data received from VICIdial and turns it into valid JSON to send to the client.

**src code**:

```python
@portal_bp.route('/recordings', methods=['POST'])
@jwt_required()
def recordingsApi():
    current_user = get_jwt_identity()
    user_id = current_user["user_id"]
    data = request.get_json()

    logger.info(f"User {user_id} initiated a recordings lookup with data: {data}")

    required_params = ['dialer_url', 'user', 'pass']
    missing_params = [param for param in required_params if param not in data]
    if missing_params:
        return jsonify({"error": f"Missing required parameters: {', '.join(missing_params)}"}), 400

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

    vicidial_url = f"http://{data['dialer_url']}/{folder_name}/non_agent_api_V2.php"
    full_url = f"{vicidial_url}?{'&'.join([f'{k}={v}' for k, v in vicidial_params.items()])}"
    print(f"Complete URL: {full_url}")
    logger.info(f"User {user_id} made request to {full_url}")

    try:
        response = requests.get(vicidial_url, params=vicidial_params)
        if response.ok:
            if response.text.strip().startswith("ERROR:"):
                error_message = response.text.strip()
                logger.error(f"VICIdial API Error: {error_message}")
                return jsonify({"error": error_message}), 400
        else:
            try:
                error_content = response.json()
            except json.JSONDecodeError:
                error_content = {"error": response.text or "Unknown error from VICIdial API."}
            logger.error(f"VICIdial API Error: {error_content}")
            return jsonify(error_content), response.status_code

        lines = response.text.strip().split('
')
        headers = lines[0].split('|')
        data_lines = lines[1:-1]
        meta_line = lines[-1]
        meta_data = json.loads(meta_line).get("meta", {})
        data = [dict(zip(headers, line.split('|'))) for line in data_lines]

        logger.info(f"User {user_id} successfully fetched recordings page {meta_data.get('current_page', 'unknown')} out of {meta_data.get('total_pages', 'unknown')} where total recordings are {meta_data.get('total_records', 'unknown')} .")

        return jsonify({
            "data": data,
            **meta_data
        })

    except requests.exceptions.RequestException as e:
        logger.error(f"User {user_id} encountered an error during recordings lookup: {e}")
        return jsonify({"error": str(e)}), 500
    except ValueError as ve:
        logger.error(f"Value error: {ve}")
        return jsonify({"error": str(ve)}), 500
```

**TRANSCRIPTIOIN**

# src/features/recordings/components/Actions.tsx

clicking the button call handleTranscribe function which in turn executes sendTranscribeRequest along with the url string which it gets from the api response part inside of the row it is in.

```ts
const handleTranscribe = async (url: string) => {
  setLoading(true);
  setError(null);

  try {
    const result = await sendTranscribeRequest(url);
    console.log(result); // Handle success if needed
  } catch (err) {
    console.error("Error submitting form:", err);
    setError("Failed to submit form");
  } finally {
    setLoading(false);
  }
};
```

sendTranscribeRequest returns a promise which creates a form element (DOM Manipulation) with action attribute set to flask api and target set to \_blank to trigger new tab when response is received from the server

after form is created we create the input feild for the url and a button to submit the form. once the form is submitted we remove it from the DOM immidiately.

# src/lib/services.ts

```ts
export const sendTranscribeRequest = (url: string) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Submitting to /upload with URL:", url);

      // Create a form element
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "http://qaportal.dialer360.com:5001/upload";
      form.target = "_blank";

      // Create an input for the URL
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "url";
      input.value = url;

      // Append the input to the form
      form.appendChild(input);

      // Append the form to the body and submit it
      document.body.appendChild(form);

      // Submit and resolve immediately since the request opens in a new tab
      form.submit();
      document.body.removeChild(form);

      // Resolve promise once the form submission is initiated
      resolve("Form submitted successfully");
    } catch (error) {
      reject(error); // Reject promise on any error
    }
  });
};
```
