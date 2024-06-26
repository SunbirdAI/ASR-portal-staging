import tw, { styled } from "twin.macro";

export const TextArea = styled.textarea`
   ${tw`
    w-full
    h-full
    relative
    p-4  // Smaller base padding
    text-gray-700
    rounded
    transition
    shadow-lg
    rounded-lg
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}

  font-size: 16px; // Base font size for larger screens
  @media (max-width: 768px) {
    font-size: 14px; // Smaller font size for tablets
    padding: 3rem;  // Slightly smaller padding
  }
  @media (max-width: 480px) {
    font-size: 12px; // Even smaller font size for mobile phones
    padding: 2rem;  // Minimal padding to increase space
    height: 200px; // Fixed smaller height for very small devices
  }
`;
