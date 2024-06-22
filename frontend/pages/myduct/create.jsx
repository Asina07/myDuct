import MainLayout from "@/components/Layout/MainLayout";
import Input from "@/components/common/Input";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CreateDuct = () => {
 const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    job_number: "",
    project: "",
    area: "",
    item: "",
    square: "",
    pcs: "",
    status: "Pending",
    delivery: "",
  });
  const statusOptions = [
    "Delivered",
    "Pending",
    "Cutting",
    "Ongoing",
    "Assembling",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createDuctForm = async () => {
    try {
      // Check if job number and project are provided
      if (!formData.job_number || !formData.project) {
        toast.error("Job Number and Project are required fields");
        return; // Stop further execution
      }

      const response = await fetch("my-duct-7wkq.vercel.app/api/duct/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          delivery: date ? date.toString() : "", // Convert date to string
        }),
      });

      if (response.ok) {
        const data = await response.json();
          toast.success("Duct created successfully");
          router.push("/myduct");
        setFormData({
          job_number: "",
          project: "",
          area: "",
          item: "",
          square: "",
          pcs: "",
          status: "",
          delivery: "",
        });
      } else {
        const errorData = await response.json();
        toast.error("Failed to create record");
        console.error("Failed to create record:", errorData);
      }
    } catch (error) {
    //   toast.error("Error in creating record");
      console.error("Error in creating record:", error);
    }
  };

  return (
    <MainLayout>
      <section className="overflow-auto mt-8">
        <h1 className="my-4 font-bold text-xl">Create Duct</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createDuctForm();
          }}
          className="shagow-lg relative rounded-lg bg-white py-1"
        >
          <div className="grid gap-5 rounded-lg  p-5 sm:grid-cols-2">
            <Input
              label="Job Number"
              name="job_number"
              //   value={formData.job_number}
              defaultValue={formData.job_number}
              onChange={handleChange}
            />
            <Input
              label="Project"
              name="project"
              //   value={formData.project}
              onChange={handleChange}
            />
            <Input
              label="Area"
              name="area"
              //   value={formData.area}
              onChange={handleChange}
            />
            <Input
              label="Item"
              name="item"
              //   value={formData.item}
              onChange={handleChange}
            />
            <Input
              label="Square"
              name="square"
              //   value={formData.square}
              onChange={handleChange}
            />
            <Input
              label="Pcs"
              name="pcs"
              //   value={formData.pcs}
              onChange={handleChange}
            />
            <select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg -py-2"
            >
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Cutting">Cutting</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Assembling">Assembling</option>
            </select>

            {/* <Input
              label="Delivery"
              name="delivery"
              //   value={formData.delivery}
              onChange={handleChange}
            /> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toLocaleDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* <button onClick={handleSubmit}>Submit</button> */}
          </div>
          <div className="my-5 flex items-center justify-center gap-4">
            {/* <Button onClick={goBack} color={"dark"} >
              Back
            </Button> */}

            <Button
              variant="default"
              type="submit"
              //   disabled={isCreatingBank}
              //   loading={isCreatingBank}
              // onClick={() => setCreateBank(true)}
              className="rounded-lg"
            >
              Add Record
            </Button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </MainLayout>
  );
};

export default CreateDuct;
