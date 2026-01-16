import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate , backendurl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    street: "",
    city: "",
    state: "",                                                                                                                           
    zipcode: "",
    country: "",
    phone: "",
  });

    const [errors, setErrors] = useState({ firstName: "", LastName:"" ,email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: ""});
  
    const isValidEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
  
    const validateInputs = () => {
      const newErrors = { firstName: "",LastName: "" ,email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: ""};
      
        if (!formData.firstName.trim()) newErrors.firstName = "Name is required";
        if (!formData.LastName.trim()) newErrors.LastName = "Name is required";
      
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!isValidEmail(formData.email)) newErrors.email = "Provide a valid email address";

      if (!formData.street.trim()) newErrors.street = "Street is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
      if (!formData.country.trim()) newErrors.country = "Country is required";
      

      if (!formData.phone.trim()){ 
        newErrors.phone = "Phone is required"
      }else if(formData.phone.length !== 10){
        newErrors.phone = "Invalid Phone Number"
      }

  
      setErrors(newErrors);
      return !newErrors.firstName && !newErrors.LastName && !newErrors.email && !newErrors.street && !newErrors.city && !newErrors.state && !newErrors.zipcode && !newErrors.country && !newErrors.phone;
    };
  

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order)=>{
    const option = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency:order.currency,
      name:"Order Payment",
      description:"Order Payment",
      order_id:order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {

          const {data} = await axios.post(backendurl+'/api/order/verifyRazorpay',response,{headers:{token}})
          if (data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(option)
    rzp.open()
  }
  
  const onSubmitHandler = async (event) => {
    
    event.preventDefault()
    if(!validateInputs()) return;
    try {
      let orderItems = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item]>0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_fee
      }

      switch(method){
        // API Calls for COD  
        case 'cod':
          { const response = await axios.post(backendurl+'/api/order/place',orderData,{headers:{token}})      
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
           break ; }

        case 'stripe':
          { const responseStripe = await axios.post(backendurl+'/api/order/stripe',orderData,{headers:{token}})
          console.log(responseStripe )
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break; }
        
        case 'razorpay':
          { const responseRazorpay = await axios.post(backendurl+ '/api/order/razorpay',orderData,{headers:{token}})
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break; }
           default:
            break
      }}
     catch (error) {
      console.log("error")
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* ------------ Left Side ---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <p className={errors.firstName ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.firstName}</p>
          </div>
          <div className="flex-1">
            <input
              onChange={onChangeHandler}
              name="LastName"
              value={formData.LastName}
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <p className={errors.LastName ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.LastName}</p>
          </div>
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <p className={errors.email ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.email}</p>
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          
        />
        <p className={errors.street ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.street}</p>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <p className={errors.city ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.city}</p>
          </div>
          <div className="flex-1">
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <p className={errors.state ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.state}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="Zipcode"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <p className={errors.zipcode ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.zipcode}</p>
          </div>
          <div className="flex-1">
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <p className={errors.country ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.country}</p>
          </div>
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <p className={errors.phone ? 'text-red-600 text-[9px] mt-1' : 'hidden'}>{errors.phone}</p>
      </div>

      {/* ---------------- Right Side --------------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ------------------ Payment Method Selectino ------------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
