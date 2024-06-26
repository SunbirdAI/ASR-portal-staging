import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`
    flex
    justify-between
    items-center
    p-10
    w-full
  `}
`;

export const DropZoneContainer = styled.div`
  ${tw`
    flex
    flex-1
    justify-center
    items-center
    p-6
    text-gray-700
    border-2
    border-dashed
    border-gray-300
    rounded-lg
    cursor-pointer
    transition
    duration-200
    ease-in-out
  `}
  background-color: #f9f9f9;
  &:hover {
    border-color: #a0aec0;
    background-color: #e9e9e9;
  }
  &.active {
    border-color: #000;
    background-color: #e9e9e9;
    color: #000;
  }
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.5vw; /* 1.25% of the viewport width */
`;

export const RecordingArea = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    justify-center
    ml-8
  `}
`;

export const LoadingContainer = styled.div`
  ${tw`
    flex
    justify-center
    items-center
    w-full
    h-full
  `}
`;
