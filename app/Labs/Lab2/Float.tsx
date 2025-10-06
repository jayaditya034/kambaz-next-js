export default function Float() {
  return (
    <>
      {/* 2.1.17.a Floating images and content */}
      <div id="wd-float-divs">
        <h2>Float</h2>
        <div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
          iusto, quas repellat dolores neque consequatur numquam, delectus quod
          vero sit perspiciatis veritatis accusantium cumque doloremque
          perferendis illum reiciendis nam. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Eius hic iusto, quas repellat dolores
          neque consequatur numquam, delectus quod vero sit perspiciatis
          veritatis accusantium cumque doloremque perferendis illum reiciendis
          nam.
          <br />
          <img
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
          iusto, quas repellat dolores neque consequatur numquam, delectus quod
          vero sit perspiciatis veritatis accusantium cumque doloremque
          perferendis illum reiciendis nam. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Eius hic iusto, quas repellat dolores
          neque consequatur numquam, delectus quod vero sit perspiciatis
          veritatis accusantium cumque doloremque perferendis illum reiciendis
          nam.
          <br />
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
          iusto, quas repellat dolores neque consequatur numquam, delectus quod
          vero sit perspiciatis veritatis accusantium cumque doloremque
          perferendis illum reiciendis nam. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Eius hic iusto, quas repellat dolores
          neque consequatur numquam, delectus quod vero sit perspiciatis
          veritatis accusantium cumque doloremque perferendis illum reiciendis
          nam.
          <br />
          <img
            className="wd-float-left"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic
          iusto, quas repellat dolores neque consequatur numquam, delectus quod
          vero sit perspiciatis veritatis accusantium cumque doloremque
          perferendis illum reiciendis nam. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Eius hic iusto, quas repellat dolores
          neque consequatur numquam, delectus quod vero sit perspiciatis
          veritatis accusantium cumque doloremque perferendis illum reiciendis
          nam.
          <div className="wd-float-done"></div>
        </div>
      </div>

      {/* 2.1.17.b Floating boxes horizontally */}
      <div id="wd-float-divs-2">
        <div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
            Yellow
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
            Blue
          </div>
          <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
            Red
          </div>
          <img
            className="wd-float-right"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            alt="Starship"
          />
          <div className="wd-float-done"></div>
        </div>
      </div>
    </>
  );
}
