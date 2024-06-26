import tw, { styled } from "twin.macro";

export const MainContainer = styled.div`
  ${tw`
    flex
    flex-col
    gap-2
    rounded-md
    p-2
  `}
  @media (min-width: 768px) {
    ${tw`p-4`}
  }
`;

export const LanguageDropdown = styled.select`
  ${tw`
    w-full
    px-3
    py-2
    mx-1.5
    my-2
    border border-gray-300
    rounded-lg
    bg-white
    text-gray-700
    transition
    duration-200
    ease-in-out
    outline-none
    focus:border-blue-600
    focus:ring-2
    focus:ring-blue-500
    focus:ring-opacity-50
  `}
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  &:hover {
    border-color: #a0aec0;
  }
`;

export const ResponsiveContainer = styled.div`
  ${tw`flex flex-col items-center w-full p-4 bg-white shadow-md rounded-lg`}
`;

export const ButtonContainer = styled.div`
  ${tw`mt-4 w-full text-center`}
`;
