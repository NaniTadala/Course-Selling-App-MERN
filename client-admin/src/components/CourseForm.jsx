import {
    Button,
    Card,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    MenuItem,
    Select,
} from "@mui/material";

export default function CourseForm({
    title,
    setTitle,
    description,
    setDescription,
    imageLink,
    setImageLink,
    price,
    setPrice,
    published,
    setPublished,
    isUpdate,
    createCourse,
    updateCourse,
}) {
    return (
        <div className="page">
            <h1 className="page-title">
                {isUpdate ? "Update Course" : "Create New Course"}
            </h1>

            <Card variant="outlined" sx={{ p: 3, border: "2px solid #1876D2" }}>
                <div className="input-fields">
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Image URL"
                        variant="outlined"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                    />
                    <FormControl>
                        <InputLabel
                            style={{ paddingRight: "5px" }}
                            htmlFor="outlined-adornment-amount"
                        >
                            Amount
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            label="Amount"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </FormControl>
                    <InputLabel id="demo-simple-select-label">
                        Is Published
                    </InputLabel>
                    <Select
                        style={{ padding: "0px" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={published}
                        onChange={(e) => setPublished(e.target.value)}
                    >
                        <MenuItem value={false}>False</MenuItem>
                        <MenuItem value={true}>True</MenuItem>
                    </Select>
                </div>
                <Button
                    className="button"
                    variant="contained"
                    onClick={() => (isUpdate ? updateCourse() : createCourse())}
                >
                    {isUpdate ? "Update" : "Create"}
                </Button>
            </Card>
        </div>
    );
}
