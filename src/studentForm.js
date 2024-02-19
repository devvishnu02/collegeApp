import { useState, useEffect } from "react";
import { webURL } from "./config";

const initialState = {
  name: "",
  age: "",
  date_of_birth: "",
  department: "",
  year: "",
  current_semester: "",
  address: "",
  contact_no: "",
  emergency_contact_no: "",
  use_college_bus: false,
};

const getUnixDate = (date) => {
  const currentDate = new Date(date);
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
  return unixTimestamp;
};

const unixToDate = (unix) => {
  const date = new Date(unix * 1000); // Multiply by 1000 to convert seconds to milliseconds

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  return formattedDate;
};

const StudentForm = (props) => {
  const [studentInfo, setStudentInfo] = useState(initialState);

  console.log("props", props);

  const onChange = (value, internalName) => {
    setStudentInfo((prev) => ({
      ...prev,
      [internalName]: value,
    }));
  };

  const getById = async () => {
    try {
      const request = await fetch(`${webURL}/students/${props.id}`);
      const response = await request.json();
      console.log(response);
      setStudentInfo({
        ...response,
        date_of_birth: response.date_of_birth
          ? unixToDate(response.date_of_birth)
          : "",
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (props.id) {
      getById();
    }
  }, []);

  const onSave = async () => {
    if (props.id) {
    }
    const response = await fetch(
      `${webURL}/students/${props.id ? props.id : ""}`,
      {
        method:  props.id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...studentInfo,
          date_of_birth: studentInfo.date_of_birth
            ? getUnixDate(studentInfo.date_of_birth)
            : "",
        }),
      }
    );
    console.log("response", response);
    props.onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-auto bg-black bg-opacity-40 flex justify-center items-center">
      <div
        className="bg-white mx-auto p-4 shadow w-80 rounded-md overflow-auto"
        style={{ height: "80%", width: "50%" }}
      >
        <div className="w-full mb-4 flex justify-between items-center">
          <h1 className="font-bold">Student Information</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
            onClick={() => {
              props.onClose();
            }}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div className="w-full mb-4">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="name"
          >
            Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your first name"
            id="name"
            value={studentInfo.name}
            onChange={(ev) => onChange(ev.target.value, "name")}
          />
        </div>
        <div className="w-full mb-4">
          <label className="text-sm font-medium leading-none" htmlFor="age">
            Age
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="number"
            placeholder="Enter your age"
            id="age"
            value={studentInfo.age}
            onChange={(ev) => onChange(ev.target.value, "age")}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="date_of_birth"
          >
            Date of Birth
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="date"
            placeholder="Enter your date of birth"
            id="date_of_birth"
            value={studentInfo.date_of_birth}
            onChange={(ev) => onChange(ev.target.value, "date_of_birth")}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="department"
          >
            Department
          </label>
          <div className="relative">
            <select
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              id="department"
              onChange={(ev) => onChange(ev.target.value, "department")}
              value={studentInfo.department}
            >
              <option value="" disabled selected>
                Select Department
              </option>
              <option value="0">CSE</option>
              <option value="1">ECE</option>
              <option value="2">IT</option>
              <option value="3">EEE</option>
            </select>
          </div>
        </div>
        <div className="w-full mb-4">
          <label className="text-sm font-medium leading-none" htmlFor="year">
            Year
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="number"
            placeholder="Year"
            id="year"
            value={studentInfo.year}
            onChange={(ev) => onChange(ev.target.value, "year")}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="current_semester"
          >
            Current Semester
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="number"
            placeholder="Current Semester"
            id="current_semester"
            value={studentInfo.current_semester}
            onChange={(ev) => onChange(ev.target.value, "current_semester")}
          />
        </div>
        <div className="w-full mb-4">
          <label className="text-sm font-medium leading-none" htmlFor="address">
            Address
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="string"
            placeholder="Address"
            id="address"
            value={studentInfo.address}
            onChange={(ev) => onChange(ev.target.value, "address")}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="contact_no"
          >
            Contact Number
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="string"
            placeholder="Contact Number"
            id="contact_no"
            value={studentInfo.contact_no}
            onChange={(ev) => onChange(ev.target.value, "contact_no")}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="emergency_contact_no"
          >
            Emergency Contact Number
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="string"
            placeholder="Contact Number"
            id="emergency_contact_no"
            value={studentInfo.emergency_contact_no}
            onChange={(ev) => onChange(ev.target.value, "emergency_contact_no")}
          />
        </div>
        <div className="w-full mb-4">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="use_college_bus"
          >
            Use College Bus
          </label>
          <input
            className="flex rounded-md h-5 w-4 border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
            type="checkbox"
            id="use_college_bus"
            checked={studentInfo.use_college_bus}
            onChange={(ev) =>
              onChange(!studentInfo.use_college_bus, "use_college_bus")
            }
          />
        </div>

        <div className="w-full mb-4 flex justify-end">
          <button
            type="button"
            class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;

// name: "",
// age: "",
// date_of_birth: "",
// department: "",
// year: "",
// current_semester: "",
// address: "",
// contact_no: "",
// emergency_contact_no: "",
// use_college_bus: "",
