import React, { useState, useEffect, useRef } from "react";
import "flowbite";
import { Datepicker } from "flowbite-react";
import axios from "axios";

interface SalesPipelineFormProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const SalesPipelineForm: React.FC<SalesPipelineFormProps> = ({
  onClose,
  children,
}) => {
  //Load Organization
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({
    prospect_id: "",
    stage: "",
    name: "",
    organization: "",
    title: "",
    email: "",
    phone: "",
    estimated_value: "",
    probability: "",
    expected_close_date: "",
    next_steps: "",
    notes: "",
  });

  const [expectedCloseDate, setExpectedCloseDate] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/sales-pipeline")
      .then((response) => setOrganizations(response.data))
      .catch((error) => console.error("Error fetching Organizations:", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/sales-pipeline",
        formData
      );
      console.log("SalesPipeline added:", response.data);
      onClose();
      // Handle success (e.g., clear form, show message)
    } catch (error) {
      console.error("Error adding SalesPipeline:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleDateChange = (event: { target: { name: any; value: any } }) => {
    console.log(event);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleCancel = (event) => {
    console.log("handle cancel");
    onClose();
  };
  const getClassNames = (type: string = "") => {
    let baseClass = "";

    if (type === "input") {
      return `${baseClass} appearance-none block w-full bg-gray-200 text-gray-700 
      border border-gray-200 rounded py-3 px-4 leading-tight  
      focus:outline-none focus:bg-white focus:border-gray-500`;
    } else if (type === "label") {
      return `${baseClass} block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 dark:text-white`;
    } else if (type === "email") {
      return `${baseClass} bg-gray-100`;
    }
    // ... other conditions

    return baseClass;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg" method="modal">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-2 mb-12 md:mb-0">
            <label className={getClassNames("label")}>Name</label>
            <input
              className={getClassNames("input")}
              id="grid-name"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-12 md:mb-0">
            <label className={getClassNames("label")}>Title</label>
            <input
              id="grid-title"
              type="text"
              placeholder="Title"
              className={getClassNames("input")}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-4 mb-6">
          <div className="w-full px-2">
            <label className={getClassNames("label")}>Organization</label>
            <input
              className={getClassNames("input")}
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Organization"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-4 mb-6">
          <div className="w-full px-2">
            <label className={getClassNames("label")}>Email</label>
            <input
              className={getClassNames("input")}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="w-full px-2 py-4">
            <label className={getClassNames("label")}>Phone</label>
            <input
              name="phone"
              className={getClassNames("input")}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 mb-12 md:mb-0">
            <label className={getClassNames("label")} htmlFor="grid-stage">
              Stage
            </label>
            <input
              name="stage"
              className={getClassNames("input")}
              value={formData.stage}
              onChange={handleChange}
              placeholder="Stage"
            />
          </div>
          <div className="w-full md:w-1/3 px-4 mb-12 md:mb-0">
            <label className={getClassNames("label")} htmlFor="estimated_value">
              Estimated Value
            </label>
            <input
              name="estimated_value"
              value={formData.estimated_value}
              className={getClassNames("input")}
              onChange={handleChange}
              placeholder="Est. Value"
            />
          </div>

          <div className="w-full md:w-1/3 mb-12 md:mb-0">
            <label className={getClassNames("label")} htmlFor="Probability">
              Probability
            </label>
            <input
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              className={getClassNames("input")}
              placeholder="Prob %"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-2 mb-12 md:mb-0">
            <label
              className={getClassNames("label")}
              htmlFor="expected_close_date"
            >
              Expected Close Date
            </label>
            <input
              className={getClassNames("input")}
              title="Expected Close Date"
              name="expected_close_date"
              value={formData.expected_close_date}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-12 md:mb-0">
            <label
              className={getClassNames("label")}
              htmlFor="expected_close_date"
            >
              Next Steps
            </label>

            <input
              name="next_steps"
              value={formData.next_steps}
              onChange={handleChange}
              className={getClassNames("input")}
              placeholder="Next steps"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <label
            className={getClassNames("label")}
            htmlFor="expected_close_date"
          >
            Notes
          </label>
          <p className="text-gray-600 text-xs italic">
            Detailed list of dated notes[].
          </p>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className={getClassNames("input")}
            placeholder="Notes"
          />

          {children}

          <div className="modal-action">
            <button className="btn" type="submit" onClick={handleSubmit}>
              Add
            </button>
            <button className="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SalesPipelineForm;
