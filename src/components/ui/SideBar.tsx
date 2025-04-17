import SideBarLink from "./sideBarLink";

function SideBar() {
  return (
    <div className="">
      <ul className="flex flex-col gap-4">
        <SideBarLink href="real-time-performance" to="Real Time Performance" />

        <SideBarLink href="qa-portal" to="QA portal" />

        <SideBarLink href="agents-performance" to="agent performance" />

        <SideBarLink href="lists" to="lists" />

        <SideBarLink href="servers-performance" to="servers performance" />
      </ul>
    </div>
  );
}

export default SideBar;
