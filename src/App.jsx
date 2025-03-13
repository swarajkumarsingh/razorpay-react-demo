import { useState } from "react";

function App() {
  const [razorpayKey, setRazorpayKey] = useState("");
  const [orderId, setOrderId] = useState("");
  const [razorpayAmount, setRazorpayAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);

  const handlePayment = async () => {
    if (!razorpayKey || !orderId || !razorpayAmount) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const options = {
        key: razorpayKey,
        amount: razorpayAmount,
        currency: "INR",
        name: "Test Store",
        description: "Test Transaction",
        order_id: orderId,
        handler: function (response) {
          setPaymentResponse(response);
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
      console.error("Payment failed", error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#333" }}>Razorpay Payment</h1>
        <input
          type="text"
          placeholder="Razorpay Key"
          value={razorpayKey}
          onChange={(e) => setRazorpayKey(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          placeholder="Amount in INR"
          value={razorpayAmount}
          onChange={(e) => setRazorpayAmount(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            backgroundColor: "#3399cc",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
          }}
        >
          {loading ? "Processing..." : `Pay ₹${razorpayAmount || "0.00"}`}
        </button>
      </div>

      {paymentResponse && (
        <div
          style={{
            marginTop: "20px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h3 style={{ color: "#333" }}>Payment Response</h3>
          <p>
            <strong>Order ID:</strong> {paymentResponse.razorpay_order_id}
          </p>
          <p>
            <strong>Payment ID:</strong> {paymentResponse.razorpay_payment_id}
          </p>
          <p>
            <strong>Signature:</strong> {paymentResponse.razorpay_signature}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
