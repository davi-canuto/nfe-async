package com.nfeasync.sign_xml_service.controller;

import com.nfeasync.sign_xml_service.service.XmlSignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sign-xml")
@RequiredArgsConstructor
public class SignController {

    private final XmlSignService xmlSignService;

    @PostMapping
    public ResponseEntity<String> signXml(@RequestBody String xml) {
        try {
            String signedXml = xmlSignService.signXml(xml);
            return ResponseEntity.ok(signedXml);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("error when sign XML: " + e.getMessage());
        }
    }
}
