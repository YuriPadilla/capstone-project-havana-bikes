import {
  StyledForm,
  StyledFieldset,
  StyledInputContainer,
  StyledDescriptionUl,
} from "./LeaseTimeForm.styled.js";

export default function LeaseTimeForm({
  handleChange,
  onSubmit,
  howManyBikes,
  fromDate,
  untilDate,
}) {
  const initialDate = new Date(fromDate).getTime();
  const finalDate = new Date(untilDate).getTime();

  const leaseDays = () => {
    if (finalDate >= initialDate) {
      return Math.round((finalDate - initialDate) / (24 * 60 * 60 * 1000)) + 1;
    }
  };

  return (
    <StyledForm onChange={handleChange} onSubmit={onSubmit}>
      <StyledFieldset>
        <StyledInputContainer>
          <label htmlFor="from">*From:</label>
          <input
            type="date"
            id="from"
            name="from"
            defaultValue={fromDate}
            required
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <label htmlFor="until">*Until:</label>
          <input
            type="date"
            id="until"
            name="until"
            defaultValue={untilDate}
            required
          />
        </StyledInputContainer>
      </StyledFieldset>
      <output>
        {finalDate >= initialDate && howManyBikes >= 1 ? (
          <StyledDescriptionUl>
            <li>
              <strong>Selected bikes:</strong> {howManyBikes} bike
              {howManyBikes > 1 && "s"}
            </li>
            <li>
              <strong>Lease time:</strong> {leaseDays()} day
              {leaseDays() > 1 && "s"}
            </li>
            <li>
              <strong>Final price:</strong> $
              {(leaseDays() * 10 + 5) * howManyBikes}
            </li>
          </StyledDescriptionUl>
        ) : (
          <p>
            Select{" "}
            {(isNaN(initialDate) && "days") ||
              (isNaN(finalDate) && "days") ||
              (finalDate < initialDate && "days correctly")}{" "}
            {(isNaN(initialDate) && howManyBikes === 0 && "and") ||
              (isNaN(finalDate) && howManyBikes === 0 && "and") ||
              (finalDate < initialDate && howManyBikes === 0 && "and")}{" "}
            {howManyBikes === 0 && "bikes"}
          </p>
        )}
      </output>
    </StyledForm>
  );
}
