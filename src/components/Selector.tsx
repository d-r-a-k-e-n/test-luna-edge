import Select from "react-select";
import { MultiSelectorProps, PokemonI } from "../types";
import { components } from "react-select";
import { useEffect, useState } from "react";

const Selector = ({ field, label, data, error, limit }: MultiSelectorProps) => {
  const [pokemonError, setPokemonError] = useState(true);
  useEffect(() => {
    if (field.value?.length === limit) {
      setPokemonError(false);
    } else {
      setPokemonError(true);
    }
  }, [error, field]);
  const Menu = (props: any) => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength === limit ? (
          <div className="m-3">You can select only {limit} Pokemon</div>
        ) : (
          props.children
        )}
      </components.Menu>
    );
  };

  return (
    <div className="mt-2">
      <p className="font-semibold">{label}</p>
      <Select
        {...field}
        components={{ Menu }}
        getOptionLabel={(option: PokemonI) => option.name}
        getOptionValue={(option: PokemonI) => option.name}
        options={data}
        isMulti
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        styles={{
          control: (styles, state) => ({
            ...styles,
            borderColor: state.isFocused ? "#7C3AED" : "",
          }),
          dropdownIndicator: (styles, state) => ({
            ...styles,
            transition: "all .2s ease",
            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
          }),
          multiValue: (styles) => ({
            ...styles,
            padding: "0 10px",
            background: "#D3D3D3",
            "border-radius": "20px",
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: "gray",
          }),
        }}
        className={`peer w-[400px] border rounded-[4px] outline-none transition-all
          hover:border-violet-600 focus:border-violet-600 focus:ring-1 focus:ring-violet-600
          ${error && pokemonError ? "border-red" : ""}`}
      />
      <p className={`${error && pokemonError ? "text-red-700" : ""}`}>
        You must select {limit} Pokemons
      </p>
    </div>
  );
};

export default Selector;
