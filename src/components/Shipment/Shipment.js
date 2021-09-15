import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log('form submitted', data)
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name"/>
      {errors.name && <span className="error">Name is required</span>}
      
      <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}

      <input {...register("address", { required: true })} placeholder="Your Address"/>
      {errors.address && <span className="error">Address is required</span>}

      <input type="number" {...register("phone", { required: true })} placeholder="Your Phone Number"/>
      {errors.phone && <span className="error">Phone Number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;  