import React from "react";
import Badge from 'react-bootstrap/Badge'


const Flow = () => {
    return (
        <div className="row Flow">
            <div>
                <h2>How is works</h2>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div>
                        <img src="/images/phone.png" alt="" style={{ width: "100px" }} />
                    </div>
                    <div><h3><Badge pill variant="primary">
                    1.
                  </Badge> Place your oder</h3></div> 
                </div>
                <div className="col-sm">
                    <div>
                        <img src="/images/fruits_truck.png" alt="" style={{ width: "100px" }} />
                    </div>
                    <div><h3><Badge pill variant="primary">
                    2.
                  </Badge> We deliver</h3></div>
                </div>
                <div className="col-sm">
                    <div>
                        <img src="/images/basket.svg" alt="" style={{ width: "100px" }} />
                    </div>
                    <div><h3><Badge pill variant="primary">
                    3.
                  </Badge> You get fresh fruit</h3></div>
                </div>
                <div className="col-sm">
                    <div>
                        <img src="/images/yellowbasket.svg" alt="" style={{ width: "100px" }} />
                    </div>
                    <div><h3><Badge pill variant="primary">
                    4.
                  </Badge> We are colecting the basket</h3></div>
                </div>
            </div>
        </div>
    );
};
export default Flow;
