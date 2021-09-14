import React from 'preact/compat';

const DropDown = props => {

    const currentVehicle = props.annotation ?
    props.annotation.bodies.find(b => b.purpose === 'vehicle') : null;

    const setVehicle = value => () => {
        props.onUpsertBody(currentVehicle, { value, purpose: 'vehicle' });
    }

    return (
      <select value={currentVehicle} onChange={setVehicle}>
          <option value="" selected>Select a Vehicle</option>
        <option value="Car">Grapefruit</option>
        <option value="Bus">Lime</option>
        <option value="AutoRickshaw">Coconut</option>
        <option value="Bike">Mango</option>
      </select>
    );
}

export default DropDown;