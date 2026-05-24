export default function Geolocation({ location }: { location: string }) {
  return (
    <section className="bento-box box-location cyber-border">
      <div className="box-header">
        <span className="icon">
          <i className="fas fa-globe-asia"></i>
        </span>
        <span className="title">GEOLOCATION</span>
      </div>
      <div className="box-content flex-center">
        <div className="radar">
          <div className="sweep"></div>
          <div className="blip"></div>
        </div>
        <div className="coord-text">
          <p>LOC: {location.toUpperCase()}</p>
          <p>STATUS: ACTIVE</p>
        </div>
      </div>
    </section>
  );
}
