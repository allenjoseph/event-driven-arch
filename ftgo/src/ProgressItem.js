import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function ProgressItem(props) {
    return (
      <li className="list-group-item">
        <strong>{props.progress.title}</strong>
        <div className="d-flex justify-content-between align-items-center">
        {JSON.stringify(props.progress.data)}
        <span className="badge badge-light badge-pill">
          {dayjs(props.progress.timestamp).fromNow()}
        </span>
        </div>
      </li>
    );
  }