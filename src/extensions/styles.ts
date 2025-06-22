import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
   fontSizes: {
      h1: {
         regular: '2.4rem',
         large: '2.728rem',
      },
      h2: {
         regular: '1.8rem',
         large: '2.728rem',
      },
      h3: {
         regular: '1.3rem',
         large: '1.625rem',
      },
      input: {
         regular: '1rem',
         large: '1.1rem',
      },
      label: {
         regular: '1rem',
         large: '1.1rem',
      },
      commun: {
         regular: '.85rem',
         large: '1rem',
      },
   },
   sizes: {
      input: {
         regular: '2.6rem',
         large: '3.2rem',
      },
      button: {
         regular: '2.6rem',
         large: '3.2rem',
      },
      lineTable: {
         regular: '2.5rem',
         large: '3rem',
      },
   },
   mediaQueries: {
      mobile: 'screen and (max-width: 600px)',
      tablet: 'screen and (max-width: 768px)',
      notebook: 'screen and (min-width: 1024px)',
      desktop: 'screen and (min-width: 1600px)',
   },
};

export const GlobalStyle = createGlobalStyle`
  p, span, td, th {
    font-size: ${theme.fontSizes.commun.regular};

    @media ${theme.mediaQueries.desktop} {
        font-size: ${theme.fontSizes.commun.large};
    }
  }
  tr {
    height: ${theme.sizes.lineTable.regular};
    
    @media ${theme.mediaQueries.desktop} {
        height: ${theme.sizes.lineTable.large};
    }
  }
  h1 {
    font-size: ${theme.fontSizes.h1.regular};

    @media ${theme.mediaQueries.desktop} {
        font-size: ${theme.fontSizes.h1.large};
    }
  }
  h2 {
    font-size: ${theme.fontSizes.h2.regular};

    @media ${theme.mediaQueries.desktop} {
        font-size: ${theme.fontSizes.h2.large};
    }
  }
  h3 {
    font-size: ${theme.fontSizes.h3.regular};

    @media ${theme.mediaQueries.desktop} {
        font-size: ${theme.fontSizes.h3.large};
    }
  }
  label {
    font-size: ${theme.fontSizes.label.regular};

    @media ${theme.mediaQueries.desktop} {
        font-size: ${theme.fontSizes.label.large};
    }
  }
`;

export const BgContainer = styled.div`
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(0, 0, 0, 0.1);
   z-index: 999;
`;
