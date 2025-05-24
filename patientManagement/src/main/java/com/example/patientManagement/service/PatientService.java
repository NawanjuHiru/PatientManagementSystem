package com.example.patientManagement.service;

import com.example.patientManagement.dto.PatientDTO;
import com.example.patientManagement.entity.Patient;
import com.example.patientManagement.repository.PatientRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {
    private final PatientRepository repository;

    public PatientService(PatientRepository repository) {
        this.repository = repository;
    }

    // Convert DTO to Entity
    private Patient toEntity(PatientDTO dto) {
        Patient p = new Patient();

        // Don't set ID here when creating a new entity
        if (dto.getId() != null) {
            p.setId(dto.getId());
        }

        p.setName(dto.getName());
        p.setNic(dto.getNic());
        p.setDateOfBirth(dto.getDateOfBirth());
        p.setGender(dto.getGender());
        return p;
    }

    // Convert Entity to DTO
    private PatientDTO toDTO(Patient p) {
        PatientDTO dto = new PatientDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setNic(p.getNic());
        dto.setDateOfBirth(p.getDateOfBirth());
        dto.setGender(p.getGender());
        return dto;
    }

    @Transactional
    public PatientDTO createPatient(PatientDTO dto) {
        Patient patient = toEntity(dto);
        patient = repository.save(patient);
        return toDTO(patient);
    }

    public List<PatientDTO> getAllPatients() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id) {
        return repository.findById(id).map(this::toDTO).orElse(null);
    }

    public void deletePatient(Long id) {
        repository.deleteById(id);
    }
}
