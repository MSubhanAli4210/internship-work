import { AppLineChart } from "../@components/appLineChart";
import { AppPieChart } from "../@components/appPieChart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
export function AppDashboard() {
  return (
    <>
      <div
        className="
          w-full min-h-155
          p-4
          bg-gray-100
          rounded-md
          sm:pl-0
          md:w-full
        "
      >
        <h1
          className="
            text-2xl font-bold
          "
        >
          Dashboard
        </h1>

        <div>
          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              
            "
          >
            <Card
              className="
                m-2
              "
            >
              <CardHeader>
                <CardTitle>Welcome to the App Dashboard</CardTitle>
                <CardDescription>
                  Here you can find an overview of your application's
                  performance and statistics.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="
                m-2
              "
            >
              <CardHeader>
                <CardTitle>Welcome to the App Dashboard</CardTitle>
                <CardDescription>
                  Here you can find an overview of your application's
                  performance and statistics.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="
                m-2
              "
            >
              <CardHeader>
                <CardTitle>Welcome to the App Dashboard</CardTitle>
                <CardDescription>
                  Here you can find an overview of your application's
                  performance and statistics.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card
              className="
                m-2
              "
            >
              <CardHeader>
                <CardTitle>Welcome to the App Dashboard</CardTitle>
                <CardDescription>
                  Here you can find an overview of your application's
                  performance and statistics.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div
            className="
              flex
              md:justify-between
              flex-col 
              md:flex-row
            "
          >
            <div
              className="
                m-2
                sm:w-full
                md:w-[50%]
              "
            >
              <AppLineChart />
            </div>
            <div
              className="
                m-2
                sm:w-full
                md:w-[50%]
              "
            >
              <AppPieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
