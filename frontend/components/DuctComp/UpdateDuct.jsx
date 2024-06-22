import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import Input from "../common/Input";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { CalendarIcon } from "lucide-react";

const UpdateDuct = ({ data }) => {
  const router = useRouter();
  const [ductData, setDuctData] = useState({
    job_number: data.job_number,
    project: data.project,
    area: data.area,
    item: data.item,
    square: data.square,
    pcs: data.pcs,
    status: data.status,
    delivery: data.delivery,
    date: data.date,
  });
  const [date, setDate] = useState(data.date ? new Date(data.date) : null);

  useEffect(() => {
    setDuctData({
      job_number: data.job_number,
      project: data.project,
      area: data.area,
      item: data.item,
      square: data.square,
      pcs: data.pcs,
      status: data.status,
      delivery: data.delivery,
    //   date: data.date,
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDuctData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDuctData();
  };

  const updateDuctData = () => {
    fetch(`my-duct-7wkq.vercel.app/api/duct/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...ductData, date }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.success) {
          toast.success("Duct updated successfully!");
          //   router.push("/myduct");
        } else {
          toast.error("Failed to update duct!");
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        toast.error("Error updating duct!");
      });
  };

  return (
    <div>
      <section>
        <h1 className=" font-bold text-xl">Update Duct</h1>
        <form
          onSubmit={handleSubmit}
          className="shadow-lg relative rounded-lg bg-white py-1"
        >
          <div className="grid gap-5 rounded-lg p-5 sm:grid-cols-2">
            <Input
              label="Job Number"
              name="job_number"
              value={ductData.job_number}
              onChange={handleChange}
            />
            <Input
              label="Project"
              name="project"
              value={ductData.project}
              onChange={handleChange}
            />
            <Input
              label="Area"
              name="area"
              value={ductData.area}
              onChange={handleChange}
            />
            <Input
              label="Item"
              name="item"
              value={ductData.item}
              onChange={handleChange}
            />
            <Input
              label="Square"
              name="square"
              value={ductData.square}
              onChange={handleChange}
            />
            <Input
              label="Pcs"
              name="pcs"
              value={ductData.pcs}
              onChange={handleChange}
            />
            <select
              label="Status"
              name="status"
              value={ductData.status}
              onChange={handleChange}
              className="border rounded-lg py-2"
            >
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Cutting">Cutting</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Assembling">Assembling</option>
            </select>
            <Input
              label="Delivery"
              name="delivery"
              value={ductData.delivery}
              onChange={handleChange}
              placeholder='mm/dd/yy'
            />
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="sm:min-w-[12rem] max-w-[15rem] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 z-999" />
                  {date ? date.toLocaleDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  className={"z-9999"}
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
          </div>
          <div className="my-5 flex items-center justify-center gap-4">
            <Button variant="default" type="submit" className="rounded-lg">
              Update Record
            </Button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </div>
  );
};

export default UpdateDuct;
