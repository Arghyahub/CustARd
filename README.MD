# CustARd

Welcome to CustARd, your immersive augmented reality shopping experience. Explore products, engage with a chatbot for personalized recommendations, and visualize items in your space using AR/VR technology.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Test Cases & Evaluation Criteria](#test-cases--evaluation-criteria)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To get started with CustARd, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/CustARd.git
   ```

### Client Side

For setting up client side

2. Install dependencies:

   ```bash
   cd CustARd/client
   npm install
   ```

3. Start the application:

   ```bash
   npm run dev
   ```

Client will be running at http://localhost:5173/

### Server Side

2. Install dependencies:

   ```bash
   cd CustARd/server
   npm install
   ```

3. Start the application:

   ```bash
   npm run dev
   ```

Server will be running at http://localhost:8000/

Make sure to create a .env file with the following configurations:

### For Client dir .env

```bash
VITE_BACKEND=http://localhost:8000
```

### For Server dir .env

```
DATABASE= mongodb_atlas_url
SECRET= password_secret
CLOUD_NAME= cloudinary_name
API_KEY= cloudinary_key
API_SECRET= cloudinary_api
CLOUDINARY_URL= cloudinary_url
```

## Technologies Used

- Frontend: React.js, Shadcn
- Backend: Node.js
- Database: MongoDB
- Other: Reality Scan and Sketchfab for 3d models

## Demo

Access the website live:- [https://custard-gray.vercel.app/](https://custard-gray.vercel.app/)
Watch the video demo [here](https://drive.google.com/file/d/1-IxMY_eFQ6qImF7--TxALaCoFJVurlv_/view?usp=sharing)

## Screenshots

![Auth Page](https://res.cloudinary.com/dwuyp1nss/image/upload/v1708788101/login_jzhtwj.png)
![Products Page](https://res.cloudinary.com/dwuyp1nss/image/upload/v1708788103/products_wpi1aj.png)
![List product](https://res.cloudinary.com/dwuyp1nss/image/upload/v1708788102/list_product_nvapeu.png)
![Vaseline](https://res.cloudinary.com/dwuyp1nss/image/upload/v1708788114/Vaseline_gn93gf.png)
![Highlighter](https://res.cloudinary.com/dwuyp1nss/image/upload/v1708788101/highlighter_izb7px.png)

## Usage

### 1. User Account Creation:

- Navigate to the website and create a user account.
- After account creation, you'll be redirected to the products page.

### 2. Product Exploration with Chatbot:

- On the products page, find the chat button in the bottom right corner.
- Interact with the chatbot by asking for recommendations or specific products.

### 3. AR Experience:

- Click on a recommended product to view its details on the product page.
- Explore comprehensive information, including price, specifications, and customer reviews.
- Use the "View AR" option on the product page to experience the product in augmented reality.

### 4. Seller Registration and Product Addition:

- Create your seller profile.
- Access the seller dashboard to manage products.
- Add new products and upload 3D product models following the provided instructions.

## Test Cases & Evaluation Criteria

### 1. User and Seller Account Creation:

- Verify successful login and signup for both user and seller.
- Use the following credentials for testing:
  - User: email: test@test.com, password: test
  - Seller: email: seller@gmail.com, password: seller

### 2. Product Exploration with Chatbot:

- Test chatbot interactions for product recommendations using keywords.

### 3. AR Experience:

- Ensure the ability to view products in AR/VR mode for items with uploaded 3D models.

### 4. Adding New Products:

- Test seller profile creation, access to the seller dashboard, and the ability to add new products with 3D models.

## Contributors

<a href="https://github.com/Arghyahub/CustARd/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ArghyaHub/custard" />
</a>

<!-- Contact us -->
### Contact Us

- **Arghya Das** - [Twitter](https://twitter.com/ArghyaDas04) | [GitHub](https://github.com/Arghyahub) | [Mail](mailto:arghyadas242004@gmail.com)
- **Saakshi Raut** - [Twitter](https://twitter.com/saakshitwt) | [GitHub](https://github.com/saakshiraut28) | [Mail](mailto:saakshiraut28@gmail.com)
- **Mayank Bansal** - [Twitter](https://twitter.com/SimplerMayank) | [GitHub](https://github.com/MayankBansal12) | [Mail](mailto:mayankbansal125@gmail.com)

## License

This is a personal project, not for commercial use. The design is original, and any resemblance is unintentional and we apologize for the same. In case of queries or feedback, you can reach out to us.
