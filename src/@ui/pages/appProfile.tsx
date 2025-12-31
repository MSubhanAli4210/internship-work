import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { userAuthStore } from "../../store/userAuthStore";

export function AppProfile() {
  const { user } = userAuthStore((state) => state);
  return (
    <>
      <div
        className="
          w-full
          min-h-155
          bg-gray-100
          rounded-md
        "
      >
        <h1
          className="
            text-2xl font-bold
          "
        >
          My Profile
        </h1>

        <Card className="m-4">
          <CardHeader>
            <CardTitle>User Profile Information</CardTitle>
            <CardDescription>
              Manage your personal information and account settings here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Full Name:</strong> {user?.fullName}
            </p>
            <p>
              <strong>User Name:</strong> {user?.userName}
            </p>
            <p>
              <strong>Email:</strong> {user?.userEmail}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
