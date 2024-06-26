import tw, { styled } from "twin.macro";

export const TextArea = styled.textarea`
   ${tw`
    w-full
    h-full
    p-3
    text-2xl md:text-4xl
    text-gray-700
    rounded
    transition
    placeholder:text-4xl
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
  `}
`;

export const ResponsiveContainer = styled.div`
  ${tw`relative p-4 bg-white shadow-lg rounded-lg`}
`;

export const ButtonContainer = styled.div`
  ${tw`absolute right-4 bottom-4`}
  @media (max-width: 640px) {
    ${tw`relative mt-4`}
  }
`;
