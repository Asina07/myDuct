
import { Modal } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import ViewDuct from "@/components/DuctComp/ViewDuct";
import StatusPill from "@/components/common/StatusPill";
import { useRouter } from "next/router";
import UpdateDuct from "@/components/DuctComp/UpdateDuct";
import MainLayout from "@/components/Layout/MainLayout";
import { CiEdit } from "react-icons/ci";


const MyDuct = () => {
  const [ductData, setDuctData] = useState([]);
  const [jobNumber, setJobNumber] = useState("");
  const [project, setProject] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [ModalData, setModalData] = useState(null);
  const [openupdateForm, setOpenupdateForm] = useState(false);

  

  useEffect(() => {
    fetchDuctData();
  }, [page, pageSize, status, jobNumber, project, item]);

  const fetchDuctData = () => {
    fetch(
      `my-duct-7wkq.vercel.app/api/duct/getall?page=${page}&pageSize=${pageSize}&status=${status}&job_number=${jobNumber}&project=${project}&item=${item}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDuctData(data.data);
          setTotalPages(data.totalPages);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleModalOpen = (data) => {
    setOpenModal(true);
    setModalData(data);
  };
  const handleModalUpdateForm = (data) => {
    setOpenupdateForm(true);
    setModalData(data);
  };
  const handleClose = () => {
      setOpenModal(false);
    setOpenupdateForm(false);
      
  };
  const router = useRouter();
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    // Format the date in a desired format (e.g., "DD/MM/YYYY")
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
    };
    console.log("ductData", ductData);
  return (
    <MainLayout>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <div className="p-4 bg-white dark:bg-gray-900 w-full flex gap-4  flex-wrap justify-between ">
          {!hideButton && (
            <Button className=" w-24 " onClick={() => setHideButton(true)}>
              Search
            </Button>
          )}
          {hideButton && (
            <div className="flex gap-4 md:flex-row flex-col ">
              {" "}
              <Input
                type="text"
                placeholder="Search by Job Number"
                className="sm:min-w-[12rem] max-w-[15rem]"
                value={jobNumber}
                onChange={(e) => setJobNumber(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Search by Project Name"
                className="sm:min-w-[12rem] max-w-[15rem]"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Search by Item"
                className="sm:min-w-[12rem] max-w-[15rem]"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <select
                className="sm:min-w-[12rem] max-w-[15rem] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Cutting">Cutting</option>
                <option value="Ongoing">Ongoing</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          )}
          <div>
            {" "}
            <Button
              className=" w-full md:flex "
              onClick={() => router.push("/myduct/create")}
            >
              Create
            </Button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Job Number
              </th>
              <th scope="col" className="px-6 py-3">
                Project
              </th>
              <th scope="col" className="px-6 py-3">
                Area
              </th>
              <th scope="col" className="px-6 py-3">
                Item
              </th>
              <th scope="col" className="px-6 py-3">
                Square
              </th>
              <th scope="col" className="px-6 py-3">
                Pcs
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                CreatedAt
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery (dd/mm/yy)
              </th>{" "}
            </tr>
          </thead>
          <tbody>
            {ductData.map((data) => (
              <tr
                key={data.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                onClick={() => handleModalOpen(data)}
              >
                <td
                  className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleModalUpdateForm(data)}
                >
                  <CiEdit />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.job_number}
                </th>
                <td className="px-6 py-4">{data.project}</td>
                <td className="px-6 py-4">{data.area}</td>
                <td className="px-6 py-4">{data.item}</td>
                <td className="px-6 py-4">{data.square}</td>
                <td className="px-6 py-4">{data.pcs}</td>
                <td className="px-6 py-4">
                  <StatusPill status={data.status} />
                </td>
                <td className="px-6 py-4">{data.date}</td>
                <td className="px-6 py-4">{formatDate(data.delivery)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="text-xl font-bold cursor-pointer"
          >
            {`<`}
          </button>
          <span>{`Page ${page} of ${totalPages}`}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="text-xl font-bold cursor-pointer"
          >
            {`>`}
          </button>
        </div>
      </div>{" "}
      <Modal
        opened={openModal}
        onClose={handleClose}
        // title="View Duct"
        centered
      >
        <ViewDuct data={ModalData} />
      </Modal>
      <Modal
        opened={openupdateForm}
        onClose={handleClose}
        // title="View Duct"
        centered
      >
        <UpdateDuct data={ModalData} />
      </Modal>
    </MainLayout>
  );
};

export default MyDuct;
