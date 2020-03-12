CREATE FUNCTION validatefields()
RETURNS TRIGGER AS $$ 
BEGIN
    IF NEW.email!='^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
THEN RAISE EXCEPTION 'Invalid Email';
END
IF;
RETURN NEW;
END;
$$
LANGUAGE plpgsql;
CREATE TRIGGER routine BEFORE
INSERT OR
UPDATE
ON employee
FOR EACH ROW
EXECUTE PROCEDURE validatefields
();
