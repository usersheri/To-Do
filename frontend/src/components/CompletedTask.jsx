import moment from "moment";
function CompletedTask({ task }) {
  return (
    <div className="bg-slate-200 py-4 relative rounded-lg flex items-center justify-center gap-2 mb-3">
      <div className="task-info  text-slate-900 text-sm w-10/12">
        <h4 className="task-title mt-1 text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className=" italic opacity-60 absolute top-1 right-3">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompletedTask;
