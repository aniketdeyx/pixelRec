import React from "react";

interface FeatureCardProps {
  iconClass: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}


const FeatureCard: React.FC<FeatureCardProps> = ({ iconClass: Icon, title, description }) => {
  return (
    <div className="feature-card bg-[#e6f6f9] p-6 rounded-lg custom-shadow transition-all">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full flex bg-[#90e0ef] items-center justify-center text-primary">
            <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
