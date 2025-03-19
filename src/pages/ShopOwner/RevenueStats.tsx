import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from "chart.js";
import styles from "./ShopOwner.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const RevenueStats = () => {
  const orderData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Orders',
        data: [120, 150, 200, 180, 220, 250, 300],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderRadius: 5,
      },
    ],
  };

  const serviceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Services Used',
        data: [80, 100, 150, 130, 170, 200, 250],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 5,
      },
    ],
  };

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue Generated ($)',
        data: [5000, 7000, 9000, 8500, 11000, 15000, 18000],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const profitData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Profit ($)',
        data: [3000, 4000, 6000, 5500, 8000, 12000, 15000],
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={styles["revenue-container"]}>
      <h2 className={styles["revenue-title"]}>📊 Revenue Dashboard</h2>

      {/* Overview Stats */}
      <div className={styles["revenue-statsOverview"]}>
        <div className={styles["revenue-statCard"]}>
          <h3>Total Orders</h3>
          <p>1,420</p>
        </div>
        <div className={styles["revenue-statCard"]}>
          <h3>Total Services</h3>
          <p>980</p>
        </div>
        <div className={styles["revenue-statCard"]}>
          <h3>Revenue ($)</h3>
          <p>$120,000</p>
        </div>
        <div className={styles["revenue-statCard"]}>
          <h3>Profit ($)</h3>
          <p>$85,000</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles["revenue-chartsContainer"]}>
        <div className={styles["revenue-chartBox"]}>
          <h4>Orders per Day</h4>
          <Bar data={orderData} />
        </div>
        <div className={styles["revenue-chartBox"]}>
          <h4>Services Used</h4>
          <Bar data={serviceData} />
        </div>
      </div>

      <div className={styles["revenue-chartsContainer"]}>
        <div className={styles["revenue-chartBox"]}>
          <h4>Revenue per Day</h4>
          <Line data={revenueData} />
        </div>
        <div className={styles["revenue-chartBox"]}>
          <h4>Profit per Day</h4>
          <Line data={profitData} />
        </div>
      </div>
    </div>
  );
};

export default RevenueStats;
