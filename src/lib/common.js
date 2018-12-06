export function handleChange(event) {
  const { target: {name, value} } = event;
  this.setState({ [name]: value });
}
