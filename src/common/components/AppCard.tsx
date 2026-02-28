const AppCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-card rounded-2xl border border-border shadow-elevated p-8">
      {children}
    </div>
  );
};

export default AppCard;