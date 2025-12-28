package stensrud.nettside.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OptionRequestDTO {
    @NotBlank
    @Size(max = 255)
    private String Header;

    @Size(max = 2000)
    private String body;
}
