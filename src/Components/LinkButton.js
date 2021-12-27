export default function LinkButton(props) {
  const url = props.url;
  const site = props.site;
  if (url === "") {
    return null;
  } else {
    return (
      <div className={"url-button-class " + site}>
        <img width="20px" className="logoImage" src={require(`../images/${site}.png`).default} alt="logo"></img>

        <a target="_blank" rel="noreferrer" href={url}>
          {url}
        </a>
      </div>
    );
  }
}
