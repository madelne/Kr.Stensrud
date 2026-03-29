package stensrud.nettside.backend.service;

import stensrud.nettside.backend.model.Option;

import java.util.ArrayList;

public interface OptionService {
    Option findByOptionId(Integer id);
    ArrayList<Option> getAllOptions();
    Void deleteByOptionId(Integer id);
    Option createOption(Option option);
    Option updateHeader(Integer id, String header);
    Option updateBody(Integer id, String body);
}
