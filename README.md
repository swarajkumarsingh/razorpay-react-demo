# React + Vite Razorpay Integration

This is a simple React project created with Vite to test Razorpay integration. The goal is to capture the `paymentId` and `signature` after a successful transaction.

## 🚀 Getting Started

### Prerequisites
- Node.js (latest LTS recommended)
- npm or yarn
- Razorpay account and API keys

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/swarajkumarsingh/razorpay-react-demo.git
   cd razorpay-react-demo
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your Razorpay API key:
   ```env
   VITE_RAZORPAY_KEY=your_razorpay_key
   ```

### Running the Project
```sh
npm run dev
```

## 🔗 Razorpay Integration
1. Initialize Razorpay in your React component.
2. Capture the `paymentId` and `signature` in the `onSuccess` callback.
3. Send the details to your backend for verification.

Example code snippet:
```jsx
import { useEffect } from 'react';

const RazorpayButton = () => {
  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: 50000, // Amount in paise (500 INR)
      currency: "INR",
      name: "Test Store",
      description: "Test Transaction",
      handler: function (response) {
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Signature:", response.razorpay_signature);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default RazorpayButton;
```

## 📜 License
This project is licensed under the MIT License.

---
Feel free to update the repository link, API key details, and other project-specific configurations!

