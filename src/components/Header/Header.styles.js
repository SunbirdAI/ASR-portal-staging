import tw, {styled} from "twin.macro";


export const Nav = styled.div`
  ${tw`
    flex
    fixed
    justify-between
    w-screen
    items-center
    bg-sunbird-navy-blue
    p-6
    sticky
    top-0
    z-50
  `}
`;



export const Title = styled.h1`
  ${tw`
    font-semibold
    text-white
    text-4xl
    
    w-full
    max-md:hidden
    
    text-center
  `}

  @media (max-width: 600px) {
    ${tw`text-2xl`} /* Adjust as needed */
  }
`;

export const Logo = styled.img`
  ${tw`h-10`} /* 40px */

  @media (max-width: 600px) {
    ${tw`h-8`} /* Adjust as needed */
  }
`;


