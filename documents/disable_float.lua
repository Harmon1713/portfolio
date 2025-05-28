function Image(elem)
  -- Ensure elem.attributes is a table
  if type(elem.attributes) ~= "table" then
    elem.attributes = {}
  end
  -- Set the attribute to prevent floating, using a string value
  elem.attributes['data-no-figure'] = "true"
  return elem
end
