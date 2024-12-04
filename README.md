# Currency Converter

LINK: [https://forex-api-frontend.vercel.app/](https://forex-api-frontend.vercel.app/)

![image](https://github.com/user-attachments/assets/4060c3cd-75db-45a8-9a78-5b351e3ac363)
![image](https://github.com/user-attachments/assets/54e9f03a-03c7-440b-9982-681bb47f6c76)


A React-based Currency Converter application that allows users to convert between different currencies using live exchange rates. The application fetches data from a backend API and displays it in a user-friendly interface, including a line chart to visualize exchange rate trends over selected periods.


## Features
- Convert between multiple currencies.
- View live exchange rates.
- Display historical exchange rate data in a line chart.
- Select different time periods for historical data (1W, 1M, 3M, 6M, 1Y).
- Responsive design for optimal viewing on various devices.

## Technologies Used
- React
- Axios for API requests
- Recharts for data visualization
- Lucide Icons for UI icons

## Setup Instructions

Follow these steps to set up the Currency Converter application on your local machine:

1. **Clone the Repository**:

2. **Install Dependencies**:
   Ensure you have `npm` installed, then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root of the project and add the following line:
     ```
     REACT_APP_API_URL=https://web-production-88ce.up.railway.app/api
     ```
   - This URL points to the backend API that provides exchange rate data.

## Running the Project

Once the setup is complete, you can run the application using the following command:

```bash
npm start
```

- The application will start on `http://localhost:3000` by default.
- Open your browser and navigate to the URL to view the Currency Converter.

## Usage

1. Select the currency you want to convert from and to.
2. Enter the amount you wish to convert.
3. Choose a time period to view historical exchange rate data.
4. The converted amount and the exchange rate will be displayed, along with a line chart showing the historical data.

## API Endpoints

The application interacts with the following API endpoint:

- `POST /api/forex-data`: Fetch exchange rate data for the selected currencies and period.

## Postman Documentation

For detailed API documentation and examples, visit the [Postman Documentation](https://documenter.getpostman.com/view/38132779/2sAYBaAVBC).

## Deployment

This application is deployed on [Vercel](https://vercel.com). You can view the live application at the following link: [Currency Converter Live](https://forex-api-frontend.vercel.app/).





