export const LoadingIcon = () => {
  return(
    <>
      <div className="three-dot-spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>


      <style jsx>{`
        $cBlack: black;
        .three-dot-spinner {
          text-align: center;
          & div{
            display: inline-block;
            width: 18px;
            height: 18px;
            background-color: $cBlack;

          }
        }
      `}</style>
    </>
  )
}
