package stensrud.nettside.backend.controller;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import stensrud.nettside.backend.dto.OptionRequestDTO;
import stensrud.nettside.backend.dto.OptionResponseDTO;
import stensrud.nettside.backend.mapper.OptionMapper;
import stensrud.nettside.backend.model.Option;
import stensrud.nettside.backend.service.OptionService;

import java.net.URI;

@RequiredArgsConstructor
public class OptionController {
    private final OptionService service;
    private final OptionMapper mapper;


    @PostMapping("/options")
    @ApiResponse(responseCode = "201", description = "Option created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid option data provided")
    public ResponseEntity<?> create(
            @Parameter(description = "Option data to be created", required = true)
            @Valid @RequestBody OptionRequestDTO requestDTO
    ){
        Option option = service.createOption(mapper.MapToOption(requestDTO));
        Option savedOption = service.createOption(option);
        OptionResponseDTO responseDTO = mapper.MapToOptionDTO(savedOption);
        URI location = URI.create(String.format("/api/options/%d", savedOption.getId()));
        return ResponseEntity.created(location).body(responseDTO);
    }
}
