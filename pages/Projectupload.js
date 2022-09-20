import React from 'react';

function Projectupload(props) {
  return (
    <div>
      <header>Add Project</header>
        <div>        
          <span>Project Title</span>
          <input type="text" placeholder="Enter Project Title" />
        </div>
        <div>
          <span>Project Background Image</span>
          <input type="text" placeholder="Choose File" />
          <button>Browse</button>
        </div>
        <div>
          <span>Data Type</span>
          marvelmind<input type="radio" name="" id="" />
          wonderful<input type="radio" name="" id="" />
          fruits<input type="radio" name="" id="" />
          thanourselves<input type="radio" name="" id="" />
        </div>
        <div>        
          <span>Unit</span>
          <input type="number" placeholder="scale of map in m^2" />
        </div>
        <div>
          <span>Log File</span>
          <input type="text" placeholder="Choose File" />
          <button>Browse</button>
          <button>+ Add another</button>
        </div>
        <div>
          <button>Submit</button>
        </div>
    </div>
);
}

export default Projectupload;