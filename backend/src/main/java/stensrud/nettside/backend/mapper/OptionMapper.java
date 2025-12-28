package stensrud.nettside.backend.mapper;

import stensrud.nettside.backend.dto.OptionRequestDTO;
import stensrud.nettside.backend.dto.OptionResponseDTO;
import stensrud.nettside.backend.model.Option;

public class OptionMapper {
    public OptionResponseDTO MapToOptionDTO(Option option){
        if(option == null) {
            return null;
        }
        OptionResponseDTO responseDTO = new OptionResponseDTO();
        responseDTO.setHeader(option.getHeader());
        responseDTO.setBody(option.getBody());
        return responseDTO;
    }

    public Option MapToOption(OptionRequestDTO requestDTO){
        if(requestDTO == null) {
            return null;
        }
        Option option = new Option(requestDTO.getHeader(), requestDTO.getBody());
        return option;
    }
}
