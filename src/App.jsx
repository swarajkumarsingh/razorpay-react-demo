import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
      const orderId = "order_Q3DxQHooIzQSlb";
      const razorpayAmount = "700";

      const options = {
        key: razorpayKey,
        amount: razorpayAmount,
        currency: "INR",
        name: "Test Store",
        description: "Test Transaction",
        order_id: orderId,
        handler: function (response) {
          console.log("response", response);
          console.log(response.razorpay_order_id);
          console.log(response.razorpay_payment_id);
          console.log(response.razorpay_signature);
          alert("Payment successful: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("hi");
      console.error("Payment failed", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Razorpay Test</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay ₹5.00"}
      </button>
    </div>
  );
}

export default App;
