import React from 'react'
import Pagination from "@material-ui/lab/Pagination";
  import { ThemeProvider} from "@material-ui/core"
  import { createTheme } from '@material-ui/core/styles'
function CustomPagination({totalPages=10,setPage}) {
      const handlePage = (value)=>{
        setPage(value)
          window.scroll(0,0)
      }
      const darkTheme = createTheme({
        palette: {
          type: "dark",
        },
      });
  return (
    <div   style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}>
        <ThemeProvider theme={darkTheme}>
        <Pagination count={totalPages} 
           hideNextButton
           hidePrevButton
        color="primary" onChange={(e)=>handlePage(e.target.textContent)} />

        </ThemeProvider>
    
    </div>
  )
}

export default CustomPagination