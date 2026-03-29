package stensrud.nettside.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import stensrud.nettside.backend.model.Option;

import java.util.ArrayList;

public interface OptionRepository extends JpaRepository<Option, Integer> {

}
