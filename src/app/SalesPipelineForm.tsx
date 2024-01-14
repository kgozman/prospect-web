import React, { useState, useEffect, useRef } from "react";
import "flowbite";
import { Datepicker } from "flowbite-react";
import axios from "axios";
import NoteComponent from "./components/NoteComponent";

interface Note {
  isEditing: any;
  content: string;
  createdAt?: Date; // Optional date field
  // Add other fields as needed
}

interface InitialData {
  title: string | number | readonly string[] | undefined;
  organization: string | number | readonly string[] | undefined;
  email: string | number | readonly string[] | undefined;
  phone: string | number | readonly string[] | undefined;
  stage: string | number | readonly string[] | undefined;
  estimated_value: string | number | readonly string[] | undefined;
  probability: string | number | readonly string[] | undefined;
  expected_close_date: string | number | readonly string[] | undefined;
  next_steps: string | number | readonly string[] | undefined;
  name: string | number | readonly string[] | undefined;
  _id: any;
  note: string; //first note
  notes: Note[];
  newNote: string;
  existingNotes: Note[];x
}

interface SalesPipelineFormProps {
  onClose: () => void;
  initialData?: InitialData | null;
  children?: React.ReactNode;
  prospects: [];
  setProspects: () => void;
}

const SalesPipelineForm: React.FC<SalesPipelineFormProps> = ({
  onClose,
  children,
  initialData,
  setProspects,
  prospects,
}) => {
  const initialState = {
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

    newNote: "",
    existingNotes:[],

    // // notes: initialData ? initialData.notes.map(note => ({ ...note, isEditing: false })) : [],
    // notes: initialData && Array.isArray(initialData.notes)
    // ? initialData.notes.map(note => ({ ...note, isEditing: false }))
    // : [],
    notes:
      initialData?.notes.map((note) => ({ ...note, isEditing: false })) || [],

    _id: "",
  };

  //Load Organization
  const [organizations, setOrganizations] = useState([]);

  // Use initialData if provided, otherwise use initialState
  const [formData, setFormData] = useState(initialData || initialState);

  const [expectedCloseDate, setExpectedCloseDate] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/sales-pipeline")
      .then((response) => setOrganizations(response.data))
      .catch((error) => console.error("Error fetching Organizations:", error));
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (initialData) {
        console.log("Initial Data");
        console.log(initialData);
        const response = await axios.put(
          `http://localhost:3001/api/sales-pipeline/${initialData._id}`,
          formData
        );
        console.log("SalesPipeline updated:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/sales-pipeline",
          formData
        );
        console.log("SalesPipeline added:", response.data);
      }
      onClose();
      // Handle success (e.g., clear form, show message)
    } catch (error) {
      console.error("Error adding SalesPipeline:", error);
      // Handle error (e.g., show error message)
    }
  };

  //Handle New Sales Lead
  const handleNewSubmit = async (event: { preventDefault: () => void }) => {
    debugger;
    event.preventDefault();
    try {
      if (initialData) {
        console.log("Initial Data");
        console.log(initialData);
        const response = await axios.put(
          `http://localhost:3001/api/sales-pipeline/${initialData._id}`,
          formData
        );
        console.log("SalesPipeline updated:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/sales-pipeline",
          formData
        );
        console.log("SalesPipeline added:", response.data);
      }
      onClose();
      // Handle success (e.g., clear form, show message)
    } catch (error) {
      console.error("Error adding SalesPipeline:", error);
      // Handle error (e.g., show error message)
    }
  };

  //Handle New Sales Lead
  const handleEditSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (initialData) {
        console.log("Initial Data");
        console.log(initialData);
        const response = await axios.put(
          `http://localhost:3001/api/sales-pipeline/${initialData._id}`,
          formData
        );
        console.log("SalesPipeline updated:", response.data);
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/sales-pipeline",
          formData
        );
        console.log("SalesPipeline added:", response.data);
      }
      onClose();
      // Handle success (e.g., clear form, show message)
    } catch (error) {
      console.error("Error adding SalesPipeline:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleDateChange = (event: { target: { name: any; value: any } }) => {
    console.log(event);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleCancel = (event: any) => {
    console.log("handle cancel");
    onClose();
  };

  const handleDeleteProspect = async (id: any) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3001/api/sales-pipeline/${id}`);
      // Update the UI by removing the deleted item from the state
      setProspects(prospects?.filter((prospect) => prospect.id !== id));
    } catch (error) {
      console.error("Error deleting prospect:", error);
      // Handle error (e.g., show error message)
    }
  };
  const handleNoteChange = (index: number, key: keyof Note, value: string) => {
    const updatedNotes = formData.notes.map((note, noteIndex) => {
      if (noteIndex === index) {
        return { ...note, [key]: value };
      }
      return note;
    });
    setFormData({ ...formData, notes: updatedNotes });
  };


  // Handle change in the new note textarea
  const handleNewNote = (event) => {
    setFormData({ ...formData, newNote: event.target.value });
  };

  const addNote = () => {
    // setFormData({ ...formData, notes: [...formData.notes, { content: '', createdAt: new Date() }] });
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

  const toggleNoteEditing = (index: number) => {
    const updatedNotes = formData.notes.map((note, noteIndex) => {
      if (noteIndex === index) {
        return { ...note, isEditing: !note.isEditing };
      }
      return note;
    });
    setFormData({ ...formData, notes: updatedNotes });
  };

  const addNewNote = () => {
    const newNote = { content: "", createdAt: new Date(), isEditing: true };
    setFormData({ ...formData, notes: [...formData.notes, newNote] });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg" method="modal">
        <div className="container">
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
              <label
                className={getClassNames("label")}
                htmlFor="estimated_value"
              >
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
          <div className="flex flex-wrap -mx-3 mb-12">
            <label
              className={getClassNames("label")}
              htmlFor="expected_close_date"
            >
              Notes
              <br />
            </label>
            <p className="text-gray-600 text-xs italic">
              Detailed list of dated notes[].
              <br />
            </p>
          </div>
          <div className="flex flex-wrap -mx-3 mb-12">
            {initialData ? (
              Array.isArray(formData.notes) &&
              formData.notes.map((note, index) => (
                <div key={index}>
                  {note.content} | Created: {note.createdAt}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-wrap -mx-3 mb-12">
            {initialData ? 
              <></>
              :
              <textarea
                name="notes"
                value={formData.newNote}
                onChange={handleChange}
                className={getClassNames("input")}
                placeholder="Notes"
              />
            }
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-12">
          {initialData ? (
            Array.isArray(formData.notes) &&
            formData.notes.map((note, index) => (
              <NoteComponent
                key={index}
                note={note}
                index={index}
                handleNoteChange={handleNoteChange}
                toggleNoteEditing={toggleNoteEditing}
              />
            ))
          ) : (
            <textarea
              name="newNote"
              onChange={handleNewNote}
              placeholder="Add a new note..."
            />
          )}
          {children}

          <div className="modal-action">
            {/* If this is edit, then the option is to append add a new note */}
            {initialData ? (
              <button onClick={addNewNote}>Add Note</button>
            ) : (
              <></>
            )}

            {initialData ? (
              Array.isArray(formData.notes) &&
              formData.notes.map((note, index) => (
                <NoteComponent
                  key={index}
                  note={note}
                  index={index}
                  handleNoteChange={handleNoteChange}
                  toggleNoteEditing={toggleNoteEditing}
                />
              ))
            ) : (
              <NoteComponent
                handleNoteChange={handleNoteChange}
                toggleNoteEditing={toggleNoteEditing}
              />
            )}
            {children}
          </div>
          <div className="modal-action">
            {/* If this is edit, then the option is to append add a new note */}
            {initialData ? (
              <button onClick={addNewNote}>Add Note</button>
            ) : (
              <></>
            )}

            <button className="btn" type="submit" onClick={handleSubmit}>
              {initialData ? "Save Changes" : "Save New Prospect"}
            </button>

            {initialData ? (
              <button className="btn" type="submit" onClick={handleEditSubmit}>
                Save Changes
              </button>
            ) : (
              <button className="btn" type="submit" onClick={handleNewSubmit}>
                Create Lead
              </button>
            )}

            <button onClick={() => handleDeleteProspect(formData._id)}>
              Delete
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
