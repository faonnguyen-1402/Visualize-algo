import "../pages/home/mainapp.css";

type Props = {
  values: number[];
  active?: number[];
  swapping?: number[];
  sorted?: number[];
};

const Visualization = ({
  values,
  active = [],
  swapping = [],
  sorted = [],
}: Props) => {
  return (
    <figure className="visualization-area">
      <div className="array-bars">
        {values.map((h, i) => {
          let statusClass = "";
          // if (active.includes(i)) statusClass = "active";
          if (active.includes(i)) {
              // Nếu là Binary Search (thường gửi 3 index: Left, Mid, Right)
              if (active.length === 3) {
                if (i === active[1]) {
                  statusClass = "active-mid"; // Node giữa đang kiểm tra
                } else {
                  statusClass = "active-range"; // Hai đầu Left/Right
                }
              } else {
                // Nếu là Sorting hoặc Linear Search bình thường
                statusClass = "active";
              }
          }  
          
          if (swapping.includes(i)) statusClass = "swapping"; 
          if (sorted.includes(i)) statusClass = "sorted";
          return(
            <div key={i} className={`bar ${statusClass}`} style={{ height: `${h}%` }}>
              <span className="bar-label">{h}</span>
            </div>
          );
        })}
      </div>
    </figure>
  );
};

export default Visualization;
