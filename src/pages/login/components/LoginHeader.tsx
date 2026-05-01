import { memo } from "react";
import AppLogo from "../../../common/components/AppLogo";

export const LoginHeader = memo(() => (
  <div className="text-center mb-8">
    <div className="w-20 h-20 rounded-2xl bg-primary mx-auto flex items-center justify-center shadow-glow mb-4 p-1">
      {/* <AppLogo className="text-primary-foreground" /> */}
    </div>
    <h1 className="text-2xl font-bold tracking-tight">EchoWarehouse</h1>
    <p className="text-sm text-muted-foreground mt-1">
      Smart Warehouse Management System
    </p>
  </div>
));