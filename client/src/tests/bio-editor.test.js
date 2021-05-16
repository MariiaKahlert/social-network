import BioEditor from "../components/bio-editor";
import { fireEvent, render, waitFor } from "@testing-library/react";
import axios from "../axios";

jest.mock("../axios");

test("When no bio is passed to BioEditor, an 'Add bio' button is rendered", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("button").innerHTML).toBe("Add bio");
});

test("When a bio is passed to BioEditor, an 'Edit bio' button is rendered", () => {
    const { container } = render(<BioEditor bio="I like reading" />);
    expect(container.querySelector("button").innerHTML).toBe("Edit bio");
});

test("Clicking the 'Add bio' button causes a textarea and a 'Save' button to be rendered", () => {
    const { container } = render(<BioEditor />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

test("Clicking the 'Edit bio' button causes a textarea and a 'Save' button to be rendered", () => {
    const { container } = render(<BioEditor bio="I like reading" />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toBe("Save");
});

test("Clicking the 'Save' button causes an ajax request if bio has been changed", async () => {
    axios.post.mockResolvedValue({
        data: {
            bio: "I like reading",
        },
    });
    const mockSetBio = jest.fn();
    const { container } = render(<BioEditor setBio={mockSetBio} />);
    fireEvent.click(container.querySelector("button"));
    fireEvent.change(container.querySelector("textarea"), {
        target: { value: "I like reading" },
    });
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => expect(mockSetBio.mock.calls.length).toBe(1));
});

test("Clicking the 'Save' button does not cause an ajax request if bio has not been changed", async () => {
    const mockSetBio = jest.fn();
    const { container } = render(<BioEditor setBio={mockSetBio} />);
    fireEvent.click(container.querySelector("button")); // Click "Add bio" button
    fireEvent.click(container.querySelector("button")); // Click "Save" button
    await waitFor(() => expect(mockSetBio.mock.calls.length).toBe(0));
});
