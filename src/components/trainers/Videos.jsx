import { useEffect } from "react";
import { Table, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Videos = () => {
  const dispatch = useDispatch()
  const trainerId = useSelector((state)=>state.trainer.trainerData.trainerId)
  useEffect(()=>{
  console.log(trainerId);
  })
  return (
    <div className="text-white h-100 w-100 glass-effect">
      <Table>
        <thead style={{
                  width: "150px",
                  backgroundColor: "transparent",
                  border: "none",
                }}>
          <tr>
            <td className="text-white" style={{backgroundColor: "transparent"}}>Video</td>
            <td className="text-white" style={{backgroundColor: "transparent"}}>Title</td>
            <td className="text-white" style={{backgroundColor: "transparent"}}>Discription</td>
            <td className="text-white" style={{backgroundColor: "transparent"}}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4}).map((_, idx) => (
            <tr
              key={idx}
            >
              <td
                style={{
                  width: "150px",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                <Card.Img
                  variant="top"
                  src="whychooseus.jpg"
                  alt="Thumbnail"
                  style={{
                    width: "150px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </td>
              <td
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                }}
              >
                Video Title {idx + 1}
              </td>
              <td
                style={{
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                }}
              >
                This is a brief description for video {idx + 1}.
              </td>
              <td style={{ backgroundColor: "transparent", border: "none" }}>
                <button variant="info" className="me-2">
                  View
                </button>
                <button variant="warning" className="me-2">
                  Edit
                </button>
                <button variant="danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Videos;
