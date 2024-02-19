import { useState, useEffect } from "react";
import StudentForm from "./studentForm";
import { webURL } from "./config";

const year = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
};
const Students = () => {
  const [isFormEnable, setIsFormEnable] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [seletedYear, setSelectedYear] = useState(0);
  const [departement, setDepartment] = useState("CSE");
  const tableColumns = [
    "id",
    "name",
    "age",
    "date_of_birth",
    "department",
    "year",
    "current_semester",
    "address",
    "contact_no",
    "emergency_contact_no",
    "use_college_bus",
  ];

  const getAllData = async () => {
    try {
      const request = await fetch(
        `${webURL}/students/find/${departement}/${seletedYear}`
      );
      const response = await request.json();
      setData(response);
      console.log(response);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (seletedYear && departement) {
      getAllData();
    }
  }, [seletedYear, departement]);

  const onEdit = (editId) => {
    console.log("editId", editId);
    setId(editId);
    setIsFormEnable(true);
    getAllData();
  };

  const onDelete = async (deleteId) => {
    await fetch(`${webURL}/students/${deleteId}`, {
      method: "DELETE",
    });
    getAllData();
  };

  return (
    <div className="w-full p-4">
      <div
        className={`flex space-y-4 ${
          seletedYear ? "justify-between" : "justify-end"
        } items-center mb-4`}
      >
        {seletedYear ? (
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="ml-1 inline-flex text-sm font-medium text-gray-800 hover:underline md:ml-2"
                    onClick={() => {
                      setSelectedYear(0);
                    }}
                  >
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
                      className="mr-4 h-4 w-4"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-1 text-gray-800 ">/</span>
                    <a
                      href="#"
                      className="ml-1 text-sm font-medium text-gray-800 hover:underline md:ml-2"
                    >
                      {year[seletedYear]} year
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        ) : (
          ""
        )}

        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm"
          onClick={() => {
            setIsFormEnable((prev) => !prev);
          }}
        >
          Add new Student
        </button>
      </div>
      {!seletedYear ? (
        <div className="grid grid-cols-2 gap-4 text-white">
          <div
            className="flex justify-center p-4 bg-blue-700 rounded shadow-lg  cursor-pointer"
            onClick={() => {
              setSelectedYear(1);
            }}
          >
            1st Year
          </div>
          <div
            className="flex justify-center p-4 bg-blue-700 rounded  shadow-lg cursor-pointer"
            onClick={() => {
              setSelectedYear(2);
            }}
          >
            2nd Year
          </div>
          <div
            className="flex justify-center  p-4 bg-blue-700 rounded shadow-lg cursor-pointer"
            onClick={() => {
              setSelectedYear(3);
            }}
          >
            3rd Year
          </div>
          <div
            className="flex justify-center p-4 bg-blue-700 rounded shadow-lg cursor-pointer"
            onClick={() => {
              setSelectedYear(4);
            }}
          >
            4th Year
          </div>
        </div>
      ) : (
        ""
      )}

      {seletedYear ? (
        <>
          <div className="w-full mb-4">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="department"
            >
              Filter by Department
            </label>
            <div className="relative py-2">
              <select
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
                id="department"
                onChange={(ev) => setDepartment(ev.target.value)}
                value={departement}
                style={{
                  width: "300px",
                }}
              >
                <option value="" disabled selected>
                  Select Department
                </option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="IT">IT</option>
                <option value="EEE">EEE</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex flex-col border overflow-auto shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    <span>Student Id</span>
                  </th>

                  <th
                    scope="col"
                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    DOB
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Current Semester
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Contact Number
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Emergency Contact Number
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    College Bus
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    width="100px"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((itemObj) => {
                  return (
                    <tr>
                      {tableColumns.map((internalName) => {
                        return (
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {itemObj[internalName]}
                          </td>
                        );
                      })}
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                        <div className="flex items-center">
                          <div
                            className="cursor-pointer"
                            onClick={() => onEdit(itemObj["id"])}
                          >
                            <svg
                              className="feather feather-edit"
                              fill="none"
                              height="20"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </div>
                          <div
                            className="cursor-pointer pl-3"
                            onClick={() => onDelete(itemObj["id"])}
                          >
                            <svg
                              className="feather feather-trash-2"
                              fill="none"
                              height="20"
                              stroke="red"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {data.length === 0 ? (
              <div className="py-3 items-center flex justify-center">
                There no items to show
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        ""
      )}

      {isFormEnable && (
        <StudentForm
          id={id}
          onClose={() => {
            setIsFormEnable((prev) => !prev);
            setId(0);
            getAllData();
          }}
        />
      )}
    </div>
  );
};

export default Students;
